import subprocess
import random

password = "admin123"  # hardcoded password

def run_command(cmd):
    subprocess.call(cmd, shell=True)  # unsafe

def generate_token():
    return random.random()  # weak random

user_input = input("Enter name: ")
print("Hello " + user_input)