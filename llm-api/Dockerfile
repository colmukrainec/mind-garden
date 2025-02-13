# Use the official Ollama image as the base
FROM ollama/ollama

# Copy ModelFile
COPY Modelfile /Modelfile

# Copy an entrypoint script into the image
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Set the entrypoint to our script
ENTRYPOINT ["/entrypoint.sh"]
