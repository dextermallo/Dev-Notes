---
last_update:
    date: 2024-03-26
tags: ['Crypto', 'HackTheBox']
---

# [SPG](https://app.hackthebox.com/challenges/SPG)

## 0. Analysis

Given a script and outputs, solves the crypto to get the flag.

Original scripts:

```python
from hashlib import sha256
import string, random
from secret import MASTER_KEY, FLAG
from Crypto.Cipher import AES
from Crypto.Util.Padding import pad
from base64 import b64encode

ALPHABET = string.ascii_letters + string.digits + '~!@#$%^&*'

def generate_password():
    master_key = int.from_bytes(MASTER_KEY, 'little')
    password = ''

    while master_key:
        bit = master_key & 1
        if bit:
            password += random.choice(ALPHABET[:len(ALPHABET)//2])
        else:
            password += random.choice(ALPHABET[len(ALPHABET)//2:])
        master_key >>= 1

    return password

def main():
    password = generate_password()
    encryption_key = sha256(MASTER_KEY).digest()
    cipher = AES.new(encryption_key, AES.MODE_ECB)
    ciphertext = cipher.encrypt(pad(FLAG, 16))

    with open('output.txt', 'w') as f:
        f.write(f'Your Password : {password}\nEncrypted Flag : {b64encode(ciphertext).decode()}')

if __name__ == '__main__':
    main()

```

## 1. Solution

```python
from hashlib import sha256
import string
from Crypto.Cipher import AES
import base64


MASTER_KEY="<redcated>"
FLAG="<redcated>"
ALPHABET = string.ascii_letters + string.digits + '~!@#$%^&*'

def decrypt_password(password: str) -> str:
    res = ''
    for p in password:

        # re-assemble master_key's bit form the if-else condition
        res = '1' + res if p in ALPHABET[:len(ALPHABET)//2] else '0' + res

    # int(res, 2) to get the value of int.from_bytes(MASTER_KEY, 'little')
    # int.to_bytes() requires the length of bytes to in case of BOF.
    # decode as string and remove null.
    return int(res, 2).to_bytes(len(res), byteorder='little').decode("utf-8").rstrip('\x00')

def decrypt_cipher(flag: str, master_key: str) -> str:
    key = sha256(master_key.encode()).digest()
    cipher = AES.new(key, AES.MODE_ECB)
    return cipher.decrypt(base64.b64decode(flag.encode())).decode('utf-8')
    
master_key: str = decrypt_password(MASTER_KEY)
print(decrypt_cipher(FLAG, master_key))
```