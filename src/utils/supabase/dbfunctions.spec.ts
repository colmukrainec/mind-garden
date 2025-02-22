import { login, signup, logout, deleteAccount } from '../../actions/auth'
import { createClient } from '../supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

// Mock Next.js functions
jest.mock('next/cache', () => ({
  revalidatePath: jest.fn(),
}))

jest.mock('next/navigation', () => ({
  redirect: jest.fn(),
}))

// Mock Supabase client
jest.mock('../supabase/server', () => ({
  createClient: jest.fn(),
}))

describe('Auth Functions', () => {
  let mockSupabaseClient: any;
  
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
    
    // Create mock Supabase client
    mockSupabaseClient = {
      auth: {
        signInWithPassword: jest.fn(),
        signUp: jest.fn(),
        signOut: jest.fn(),
        admin: {
          deleteUser: jest.fn(),
        },
      },
    };
    
    (createClient as jest.Mock).mockResolvedValue(mockSupabaseClient);
  });

  describe('login', () => {
    it('should successfully log in a user', async () => {
      // Arrange
      const formData = new FormData();
      formData.append('email', 'test@example.com');
      formData.append('password', 'password123');
      
      mockSupabaseClient.auth.signInWithPassword.mockResolvedValue({ error: null });

      // Act
      await login(formData);

      // Assert
      expect(mockSupabaseClient.auth.signInWithPassword).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
      });
      expect(revalidatePath).toHaveBeenCalledWith('/', 'layout');
      expect(redirect).toHaveBeenCalledWith('/home');
    });

    it('should return error message on login failure', async () => {
      // Arrange
      const formData = new FormData();
      formData.append('email', 'test@example.com');
      formData.append('password', 'wrong');
      
      mockSupabaseClient.auth.signInWithPassword.mockResolvedValue({
        error: { message: 'Invalid credentials' },
      });

      // Act
      const result = await login(formData);

      // Assert
      expect(result).toEqual({ error: 'Invalid credentials' });
      expect(redirect).not.toHaveBeenCalled();
    });
  });

  describe('signup', () => {
    it('should successfully sign up a new user', async () => {
      // Arrange
      const formData = new FormData();
      formData.append('email', 'new@example.com');
      formData.append('password', 'password123');
      formData.append('firstName', 'John');
      formData.append('lastName', 'Doe');
      
      mockSupabaseClient.auth.signUp.mockResolvedValue({ error: null });

      // Act
      await signup(formData);

      // Assert
      expect(mockSupabaseClient.auth.signUp).toHaveBeenCalledWith({
        email: 'new@example.com',
        password: 'password123',
        options: {
          data: {
            first_name: 'John',
            last_name: 'Doe',
          }
        }
      });
      expect(revalidatePath).toHaveBeenCalledWith('/', 'layout');
      expect(redirect).toHaveBeenCalledWith('/home');
    });

    // it('should validate first name', async () => {
    //   // Arrange
    //   const formData = new FormData();
    //   formData.append('firstName', 'J'); // Too short
      
    //   // Act
    //   const result = await signup(formData);

    //   // Assert
    //   expect(result).toEqual({ error: 'First name must be at least 2 characters long' });
    //   expect(mockSupabaseClient.auth.signUp).not.toHaveBeenCalled();
    // });

    // Name validation tests within signup context
    describe('name validation', () => {
      it('should return error when firstName is missing', async () => {
        const formData = new FormData();
        formData.append('lastName', 'Doe');
        
        const result = await signup(formData);
        expect(result).toEqual({ error: 'First name is required' });
        expect(mockSupabaseClient.auth.signUp).not.toHaveBeenCalled();
      });

      it('should return error when lastName is missing', async () => {
        const formData = new FormData();
        formData.append('firstName', 'John');
        
        const result = await signup(formData);
        expect(result).toEqual({ error: 'Last name is required' });
        expect(mockSupabaseClient.auth.signUp).not.toHaveBeenCalled();
      });

      it('should return error when firstName is too short', async () => {
        const formData = new FormData();
        formData.append('firstName', 'J');
        formData.append('lastName', 'Doe');
        
        const result = await signup(formData);
        expect(result).toEqual({ error: 'First name must be at least 2 characters long' });
        expect(mockSupabaseClient.auth.signUp).not.toHaveBeenCalled();
      });

      it('should return error when lastName is too short', async () => {
        const formData = new FormData();
        formData.append('firstName', 'John');
        formData.append('lastName', 'D');
        
        const result = await signup(formData);
        expect(result).toEqual({ error: 'Last name must be at least 2 characters long' });
        expect(mockSupabaseClient.auth.signUp).not.toHaveBeenCalled();
      });
    });


  });

  describe('logout', () => {
    it('should successfully log out a user', async () => {
      // Arrange
      mockSupabaseClient.auth.signOut.mockResolvedValue({ error: null });

      // Act
      await logout();

      // Assert
      expect(mockSupabaseClient.auth.signOut).toHaveBeenCalled();
      expect(revalidatePath).toHaveBeenCalledWith('/', 'layout');
      expect(redirect).toHaveBeenCalledWith('/');
    });

    it('should redirect to error page on logout failure', async () => {
      // Arrange
      mockSupabaseClient.auth.signOut.mockResolvedValue({
        error: { message: 'Logout failed' },
      });

      // Act
      await logout();

      // Assert
      expect(redirect).toHaveBeenCalledWith('/error');
    });
  });

  describe('deleteAccount', () => {
    it('should successfully delete a user account', async () => {
      // Arrange
      const userId = 'user123';
      mockSupabaseClient.auth.admin.deleteUser.mockResolvedValue({ error: null });

      // Act
      await deleteAccount(userId);

      // Assert
      expect(mockSupabaseClient.auth.admin.deleteUser).toHaveBeenCalledWith(userId);
      expect(revalidatePath).toHaveBeenCalledWith('/', 'layout');
      expect(redirect).toHaveBeenCalledWith('/');
    });

    it('should redirect to error page on deletion failure', async () => {
      // Arrange
      const userId = 'user123';
      mockSupabaseClient.auth.admin.deleteUser.mockResolvedValue({
        error: { message: 'Deletion failed' },
      });

      // Act
      await deleteAccount(userId);

      // Assert
      expect(redirect).toHaveBeenCalledWith('/error');
    });
  });
});