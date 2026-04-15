#!/usr/bin/env python3
"""
Extract hymns from MyList.java - handles concatenated strings
"""

import re

java_file = "/home/suubi7/springs_of_joy/SpringsOfJoy/app/src/main/java/com/example/challenger/springs/MyList.java"
ts_file = "/home/suubi7/springs_of_joy/MUSDAA-Springs-of-Joy/src/data/hymns.ts"

with open(java_file, 'r', encoding='utf-8') as f:
    content = f.read()

def extract_concatenated_string(text, start_pos):
    """
    Extract a concatenated string starting from start_pos.
    Handles patterns like: "string1" + "string2" + "string3"
    Returns (result_string, end_position)
    """
    result = ""
    i = start_pos
    
    # Skip whitespace and find opening quote
    while i < len(text) and text[i] != '"':
        i += 1
    
    if i >= len(text):
        return "", i
    
    # Extract concatenated strings
    while i < len(text):
        if text[i] != '"':
            i += 1
            continue
        
        # Found a quote, extract string content
        i += 1  # Skip opening quote
        string_content = ""
        
        while i < len(text):
            if text[i] == '\\' and i + 1 < len(text):
                # Escape sequence
                string_content += text[i:i+2]
                i += 2
            elif text[i] == '"':
                # End of string
                result += string_content
                i += 1
                break
            else:
                string_content += text[i]
                i += 1
        
        # Check for concatenation operator
        while i < len(text) and text[i] in ' \t\n\r':
            i += 1
        
        if i < len(text) and text[i] == '+':
            i += 1
            while i < len(text) and text[i] in ' \t\n\r':
                i += 1
            # Continue loop to extract next string
        else:
            # No more concatenation
            break
    
    return result, i

def process_escapes(s):
    """Process Java escape sequences"""
    s = s.replace('\\n', '\n')
    s = s.replace('\\r', '\r')
    s = s.replace('\\t', '\t')
    s = s.replace('\\"', '"')
    s = s.replace('\\\\', '\\')
    return s

hymns = {}

# Find all "db.addContact(new Song(" and extract from there
pattern = r'db\.addContact\(new\s+Song\s*\(\s*(\d+)\s*,'

for match in re.finditer(pattern, content):
    hymn_id = int(match.group(1))
    pos_after_id_comma = match.end()
    
    # Extract concatenated title
    title_raw, pos_after_title = extract_concatenated_string(content, pos_after_id_comma)
    title = process_escapes(title_raw)
    
    # Now find the next comma and extract body
    # Skip to next comma
    i = pos_after_title
    while i < len(content) and content[i] != ',':
        i += 1
    
    if i >= len(content):
        continue
    
    i += 1  # Skip comma
    
    #Extract concatenated body
    body_raw, pos_after_body = extract_concatenated_string(content, i)
    body = process_escapes(body_raw)
    
    if body:
        hymns[hymn_id] = {'id': hymn_id, 'title': title, 'body': body}

sorted_hymns = sorted(hymns.values(), key=lambda x: x['id'])

print(f"Extracted {len(sorted_hymns)} hymns")

# Check for gaps
ids = [h['id'] for h in sorted_hymns]
gaps = []
for i in range(1, 464):
    if i not in ids:
        gaps.append(i)

if gaps:
    print(f"Missing IDs: {', '.join(map(str, gaps))}")
else:
    print("✓ All 463 hymns found!")

# Generate TypeScript
ts_lines = [
    "// Auto-generated from MyList.java",
    "// Do not edit manually",
    "",
    "export interface Hymn {",
    "  id: number;",
    "  title: string;",
    "  body: string;",
    "}",
    "",
    "export const HYMNS: Hymn[] = ["
]

for hymn in sorted_hymns:
    # Escape for TypeScript template literals
    body_escaped = (hymn['body']
        .replace('\\', '\\\\')
        .replace('`', '\\`')
        .replace('$', '\\$'))
    
    title_escaped = hymn['title'].replace('`', '\\`').replace('$', '\\$')
    
    ts_lines.append(f"  {{ id: {hymn['id']}, title: `{title_escaped}`, body: `{body_escaped}` }},")

ts_lines[-1] = ts_lines[-1].rstrip(',')  # Remove last comma
ts_lines.extend(["];", "", "export const HYMN_COUNT = HYMNS.length;"])

with open(ts_file, 'w', encoding='utf-8') as f:
    f.write('\n'.join(ts_lines))

print(f"✓ Written {ts_file}")
print(f"Total hymns: {len(sorted_hymns)}")
