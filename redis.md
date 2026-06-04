# connect to Redis CLI inside the container
    docker exec -it redis-server redis-cli

# Test 
    PING  

# Start Redis 
    docker start redis-server   

# Stop Redis
docker stop redis-server


# Optional: Persist Redis data

If you want Redis data to survive container removal:

    docker run -d \
    --name redis-server \
    -p 6379:6379 \
    -v redis-data:/data \
    redis redis-server --appendonly yes


    