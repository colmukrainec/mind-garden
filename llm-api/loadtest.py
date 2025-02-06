import asyncio
import subprocess
import time
import torch  # For GPU acceleration (if available)
import ollama

# Initialize the Ollama client
client = ollama.Client()

# Model names
BASE_MODEL = "llama3.2:1b"
CUSTOM_MODEL = "my-custom-model"

# List of questions to run
questions = [
    "What is Python?",
    "How do I learn to code?",
    "What is the meaning of life?",
    "How can I improve my productivity?",
    "What are some tips for managing stress?",
    "What are the benefits of exercise?",
    "How do I build healthy habits?",
    "What is the best way to learn a new language?",
    "How can I improve my communication skills?",
    "What are some methods for dealing with anxiety?"
]

# Async function to check if a given model is available locally
async def is_model_available(model_name):
    process = await asyncio.create_subprocess_exec(
        "ollama", "list",
        stdout=asyncio.subprocess.PIPE,
        stderr=asyncio.subprocess.PIPE
    )
    stdout, _ = await process.communicate()
    available_models = stdout.decode()
    # Debug print to see available models
    # print("Available models:", available_models)
    return model_name in available_models

# Async function to pull a model (e.g., the base model)
async def pull_model(model_name):
    print(f"Pulling model {model_name}...")
    process = await asyncio.create_subprocess_exec(
        "ollama", "pull", model_name,
        stdout=asyncio.subprocess.PIPE,
        stderr=asyncio.subprocess.PIPE
    )
    stdout, stderr = await process.communicate()
    if process.returncode != 0:
        print(f"Error pulling {model_name}: {stderr.decode()}")
    else:
        print(f"Successfully pulled {model_name}.")

# Async function to create the custom model from the Modelfile
async def create_custom_model():
    print(f"Creating custom model {CUSTOM_MODEL} from Modelfile...")
    process = await asyncio.create_subprocess_exec(
        "ollama", "create", CUSTOM_MODEL, "-f", "Modelfile",
        stdout=asyncio.subprocess.PIPE,
        stderr=asyncio.subprocess.PIPE
    )
    stdout, stderr = await process.communicate()
    if process.returncode != 0:
        print(f"Error creating custom model: {stderr.decode()}")
    else:
        print(f"Successfully created custom model {CUSTOM_MODEL}.")

# Async function to generate a response for a given question
async def generate_response(model, question, device):
    start_time = time.time()
    try:
        # Use asyncio.to_thread to run the blocking client.generate call in a separate thread
        response = await asyncio.to_thread(client.generate, model=model, prompt=question)
        response_time = time.time() - start_time
        if response and response.response:
            print(f"Question: {question}")
            print(f"Response: {response.response}")
            print(f"Time taken: {response_time:.2f} seconds\n")
            return response_time
        else:
            print("Error: Response was not successful.\n")
            return None
    except Exception as e:
        print(f"Error generating response: {e}\n")
        return None

# Async function to run the load test after ensuring models are available
async def load_test(questions):
    start_time = time.time()

    # Check for the base model (llama3.2:1b)
    if not await is_model_available(BASE_MODEL):
        print(f"Base model {BASE_MODEL} not found locally.")
        await pull_model(BASE_MODEL)
    else:
        print(f"Base model {BASE_MODEL} is available.")

    # Check for the custom model (my-custom-model)
    if not await is_model_available(CUSTOM_MODEL):
        print(f"Custom model {CUSTOM_MODEL} not found locally.")
        await create_custom_model()
    else:
        print(f"Custom model {CUSTOM_MODEL} is available.")

    # Use the custom model for generating responses
    model_to_use = CUSTOM_MODEL

    # Check for CUDA (GPU) availability and select device accordingly
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    print(f"Using device: {device}")

    # Generate responses for all questions concurrently
    response_times = await asyncio.gather(
        *(generate_response(model_to_use, question, device) for question in questions)
    )

    # Filter out any None values (if any errors occurred)
    response_times = [rt for rt in response_times if rt is not None]

    total_time = time.time() - start_time
    average_time = sum(response_times) / len(response_times) if response_times else 0

    print(f"\nTotal time for {len(questions)} questions: {total_time:.2f} seconds")
    print(f"Average time per question: {average_time:.2f} seconds")

# Main entry point
if __name__ == "__main__":
    asyncio.run(load_test(questions))