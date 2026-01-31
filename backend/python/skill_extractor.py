import sys
import json
import spacy

nlp = spacy.load("en_core_web_sm")

# Load skills list
with open("skills.json", "r") as f:
    SKILLS = json.load(f)

def extract_skills(text):
    text = text.lower()
    found_skills = []

    for skill in SKILLS:
        if skill in text:
            found_skills.append(skill)

    return list(set(found_skills))

if __name__ == "__main__":
    resume_text = sys.stdin.read()
    skills = extract_skills(resume_text)
    print(json.dumps(skills))
