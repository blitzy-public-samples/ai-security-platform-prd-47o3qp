// Import necessary modules and dependencies.

import React, { useState } from 'react'; // React version 17.0.2
import { useSelector, useDispatch } from 'react-redux'; // react-redux version 7.2.4
import { apiRequest } from '../utils/api'; // To make HTTP requests to the backend services for fetching AI responses.
import { getAuthToken } from '../utils/auth'; // To retrieve the authentication token for secure API requests.
import { loginUser } from '../store/actions'; // Dispatches actions related to user authentication if needed.
import '../styles/global.css'; // Includes BODY_FONT_FAMILY and PRIMARY_COLOR from global styles.

/**
 * ChatBot Component
 * 
 * Renders the interactive chat interface for users to communicate with the AI assistant.
 * 
 * Requirements Addressed:
 * - Interactive AI Assistant (TR-IAA-009)
 *   - Location: Technical Specification/4.9 Interactive AI Assistant
 *   - Description: Facilitate user interaction through a conversational interface, offering suggestions, resolving inquiries, and providing guidance related to security operations based on best practices and learned patterns.
 */

const ChatBot: React.FC = () => {
  // Access global authentication state using useSelector from react-redux.
  const authState = useSelector((state: any) => state.auth);

  // Dispatch actions using useDispatch from react-redux.
  const dispatch = useDispatch();

  // Local state for managing user input.
  const [userInput, setUserInput] = useState('');

  // Local state for managing the chat history.
  const [chatHistory, setChatHistory] = useState<
    Array<{ sender: 'user' | 'ai'; message: string }>
  >([]);

  /**
   * Handles user input submission to send messages to the AI assistant.
   * 
   * Steps:
   * - Prevent default form submission behavior.
   * - Validate user input.
   * - Update chat history with user's message.
   * - Fetch AI response from the backend service.
   * - Update chat history with AI assistant's response.
   * 
   * Requirements Addressed:
   * - Ensure clear differentiation between AI-generated responses and user inputs.
   *   - Requirement ID: TR-IAA-009-3
   *   - Location: Technical Specification/4.9.4 Technical Requirements
   * - Log all assistant interactions for continuous improvement and analysis.
   *   - Requirement ID: TR-IAA-009-4
   *   - Location: Technical Specification/4.9.4 Technical Requirements
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (userInput.trim() === '') {
      return; // Do not send empty messages.
    }

    // Add user's message to chat history.
    setChatHistory((prevHistory) => [
      ...prevHistory,
      { sender: 'user', message: userInput },
    ]);

    const messageToSend = userInput;
    setUserInput(''); // Clear the input field.

    try {
      // Get the authentication token for secure API requests.
      const token = getAuthToken();

      // Make API request to fetch AI assistant's response.
      const response = await apiRequest(
        '/ai-assistant',
        'POST',
        { message: messageToSend },
        token
      );

      // Check if the response contains AI assistant's reply.
      if (response && response.data && response.data.reply) {
        // Add AI's response to chat history.
        setChatHistory((prevHistory) => [
          ...prevHistory,
          { sender: 'ai', message: response.data.reply },
        ]);
      }

      // TODO: Implement logging of assistant interactions for analysis.
      // This addresses Requirement ID: TR-IAA-009-4
    } catch (error) {
      console.error('Error fetching AI response:', error);
      // Optional: Display error message in chat history.
    }
  };

  /**
   * Renders the chat interface using JSX, applying styles from global CSS.
   * 
   * Requirements Addressed:
   * - Render the chat interface with applied styles.
   *   - Location: Steps in Function 'ChatBot' of File Specification
   */
  return (
    <div
      className="chat-container"
      style={{
        fontFamily: 'var(--body-font-family)', // BODY_FONT_FAMILY from global.css
        backgroundColor: 'var(--primary-color)', // PRIMARY_COLOR from global.css
        border: '1px solid #bdc3c7',
        borderRadius: '4px',
        padding: '10px',
        margin: '10px',
      }}
    >
      {/* Display chat history */}
      <div className="chat-history">
        {chatHistory.map((chat, index) => (
          <div
            key={index}
            className={`chat-message ${chat.sender}`}
            style={{
              textAlign: chat.sender === 'user' ? 'right' : 'left',
              margin: '5px 0',
            }}
          >
            <span
              style={{
                display: 'inline-block',
                padding: '8px',
                borderRadius: '12px',
                backgroundColor: chat.sender === 'user' ? '#e0e0e0' : '#ffffff',
                color: '#000',
                maxWidth: '70%',
              }}
            >
              {chat.message}
            </span>
          </div>
        ))}
      </div>

      {/* User input form */}
      <form onSubmit={handleSubmit} style={{ display: 'flex', marginTop: '10px' }}>
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Type your message..."
          style={{
            flex: 1,
            padding: '10px',
            fontSize: '16px',
            borderRadius: '4px',
            border: '1px solid #ccc',
          }}
        />
        <button
          type="submit"
          style={{
            padding: '10px 20px',
            marginLeft: '10px',
            fontSize: '16px',
            borderRadius: '4px',
            backgroundColor: '#2980b9',
            color: '#fff',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatBot;