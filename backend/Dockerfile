FROM ollama/ollama

# Pull the DeepSeek-R1 model
RUN ollama pull deepseek-r1

# Expose Ollama's API port
EXPOSE 11434

# Start Ollama API
CMD ["ollama", "serve"]
