import sys
import json
from pathlib import Path

import fitz
from docx import Document


BASE_DIR = Path(__file__).parent
SKILLS_FILE = BASE_DIR / "skills_list.json"


with open(SKILLS_FILE, "r", encoding="utf-8") as f:
    SKILLS = json.load(f)


def extract_pdf_text(file_path):
    doc = fitz.open(file_path)

    text = ""

    for page in doc:
        text += page.get_text()

    doc.close()

    return text


def extract_docx_text(file_path):
    document = Document(file_path)

    text = ""

    for paragraph in document.paragraphs:
        text += paragraph.text + "\n"

    return text


def extract_text(file_path):
    extension = Path(file_path).suffix.lower()

    if extension == ".pdf":
        return extract_pdf_text(file_path)

    if extension == ".docx":
        return extract_docx_text(file_path)

    raise ValueError(f"Unsupported file type: {extension}")


def extract_skills(text):
    text = text.lower()

    found_skills = []

    for canonical_skill, aliases in SKILLS.items():
        for alias in aliases:
            if alias.lower() in text:
                found_skills.append(canonical_skill)
                break

    return found_skills


if __name__ == "__main__":
    if len(sys.argv) < 3:
        print(json.dumps({
            "error": "Missing arguments"
        }))
        sys.exit(1)

    mode = sys.argv[1]

    try:
        if mode == "file":
            file_path = sys.argv[2]
            text = extract_text(file_path)

        elif mode == "text":
            text = sys.argv[2]

        else:
            raise ValueError(f"Unsupported mode: {mode}")

        skills = extract_skills(text)

        print(json.dumps({
            "text": text,
            "skills": skills
        }))

    except Exception as error:
        print(json.dumps({
            "error": str(error)
        }))
        sys.exit(1)