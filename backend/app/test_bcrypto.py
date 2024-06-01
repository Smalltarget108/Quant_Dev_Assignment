# test_hashing.py
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)


if __name__ == "__main__":

    test_password = "cs5psw"

    hashed_password = get_password_hash(test_password)
    print(f"Hashed password: {hashed_password}")

    is_valid = verify_password(test_password, hashed_password)
    print(f"Password is valid: {is_valid}")

    wrong_password = "wrongpassword"
    is_valid_wrong = verify_password(wrong_password, hashed_password)
    print(f"Wrong password is valid: {is_valid_wrong}")
