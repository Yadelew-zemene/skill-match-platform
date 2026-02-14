import sys
import json
from pathlib import Path
import fitz


BASE_DIR = Path(__file__).parent

SKILLS_FILE = BASE_DIR / "skills_list.json"

with open(SKILLS_FILE, "r") as f:
    SKILLS = json.load(f)
def extract_text(file_path):
    doc = fitz.open(file_path)
    text = ""
    for page in doc:
        text += page.get_text()
    return text

def extract_skills(text):
    text = text.lower()
    return list({skill for skill in SKILLS if skill in text})
if __name__ == "__main__":
    mode = sys.argv[1]

    if mode == "file":
        file_path = sys.argv[2]
        text = extract_text_from_pdf(file_path)

    elif mode == "text":
        text = sys.argv[2]

    else:
        print(json.dumps([]))
        sys.exit(1)

    skills = extract_skills(text)
    print(json.dumps(skills))