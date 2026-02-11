import sys
import json
from pathlib import Path

# get the directory of this script
BASE_DIR = Path(__file__).parent

# construct absolute path to skills_list.json
SKILLS_FILE = BASE_DIR / "skills_list.json"

with open(SKILLS_FILE, "r") as f:
    SKILLS = json.load(f)

def extract_skills(text):
    text = text.lower()
    return list({skill for skill in SKILLS if skill in text})

if __name__ == "__main__":
    # read resume text from stdin or file
    text = sys.stdin.read()
    skills = extract_skills(text)
    print(json.dumps(skills))
