"""
Description: Chatbot application.  Allows user to perform balance 
inquiries and make deposits to their accounts.
Author: ACE Department
Modified by: sukhpreet kaur
Date: 2024-10-30
Usage: From the console: python src/chatbot.py
"""

## GIVEN CONSTANT COLLECTIONS
ACCOUNTS = {
    123456 : {"balance" : 1000.0},
    789012 : {"balance" : 2000.0}
}

VALID_TASKS = {"balance", "deposit", "exit"}

## CODE REQUIRED FUNCTIONS STARTING HERE:

def get_account() -> int:
    """
    Request account number from user and return it as an integer.

    Returns:
        int: The account number given by the user.

    Raises:
        ValueError: For non-numeric, or non-existing account number.
    """

    try:
        account_number = int(input("Please enter your account number: "))
       
    except ValueError:
        raise ValueError("Account number must be a whole number.")
    if account_number not in ACCOUNTS:
        raise ValueError("Invalid Account number.")
    return account_number

def get_amount() ->float:
    """
    Prompt for an amount to deposit and return it as a float.

    Returns:
    float: The amount to be deposited, entered by the user.

    Raises:
    ValueError: If the amount entered is non-numeric, zero, or negative.
    Atom
    """
    try:
        amount = float(input("Enter the transaction amount: "))
    except ValueError:
        raise ValueError("Incorrect amount. Amount must be numeric.")
    if amount <= 0:
            raise ValueError("Incorrect amount. Please enter a valid amount.")
    elif amount == 0:
            raise ValueError("Incorrect amount. Please enter a non-zero number.")
    else:return amount
    
def get_balance(account: int) -> str:
    """
    Gets the balance for a given account.

    Parameters:
    account (int): The account number to get the balance for.

    Returns:
    str: A message with the account number and balance formatted as currency.

    Raises:
    ValueError: If the account number specified does not exist.
    """
    if account not in ACCOUNTS:
       raise ValueError("Invalid Account number.")

    balance = ACCOUNTS[account]["balance"]
    return f"Your current balance for account {account} is ${balance:,.2f}."

def make_deposit(account: int, amount: float) -> str:
    """
    Updates the account balance of a given account by adding the deposit amount.

    Parameters
    account: int
    The account number to be updated.
    amount: float
    The amount to deposit.

    Returns
    str: A confirmation message stating the deposit was successful.

    Raises:
    ValueError: If the account number does not exist in the ACCOUNTS dictionary.
    ValueError: If the amount is less than or equal to zero.
    """
    if account not in ACCOUNTS:
       raise ValueError("Invalid Account number")
    if amount <= 0:
       raise ValueError("Incorrect amount. Please enter a valid amount.")

    ACCOUNTS[account]["balance"] += amount
    return f"You have made a deposit of ${amount:,.2f} to account {account}."
VALID_TASKS = {"balance", "deposit", "exit"}

def user_selection() -> str:
    """
    Prompts the user for their selection of a task.

    Returns:
        str: The user's selection, lowercase.

    Raises:
        ValueError: If the user enters an invalid task.
    """
    selection = input("What would you like to do (balance/deposit/exit)? ").strip().lower()
    
    if selection not in VALID_TASKS:
        raise ValueError("Incorrect task. Select balance, deposit, or exit.")
    
    return selection

## GIVEN CHATBOT FUNCTION
## REQUIRES REVISION

def chatbot():
    '''
    The main program.  Uses the functionality of the functions:
        get_account()
        get_amount()
        get_balance()
        make_deposit()
        user_selection()
    '''

    print("Welcome! I'm the PiXELL River Financial Chatbot!  Let's get chatting!")

    keep_going = True
    while keep_going:
        try:
            ## CALL THE user_selection FUNCTION HERE 
            ## CAPTURING THE RESULTS IN A VARIABLE CALLED selection
            selection = user_selection()

            if selection != "exit":
                 # Account number validation.
                valid_account = False
                while not valid_account:
                    try:
                        ## CALL THE get_account FUNCTION HERE
                        ## CAPTURING THE RESULTS IN A VARIABLE 
                        ## CALLED account:
                        account = get_account()
                        valid_account = True
                    except ValueError as e:
                        # Invalid account.
                        print(e)

                if selection == "balance":
                        ## CALL THE get_balance FUNCTION HERE
                        ## PASSING THE account VARIABLE DEFINED 
                        ## ABOVE, AND PRINT THE RESULTS:
                        print (get_balance(account))
                else:

                    # Amount validation.
                    valid_amount = False
                    while not valid_amount:
                        try:
                            ## CALL THE get_amount FUNCTION HERE
                            ## AND CAPTURE THE RESULTS IN A VARIABLE 
                            ## CALLED amount:
                            amount = get_amount()
                            valid_amount = True
                        except ValueError as e:
                            # Invalid amount.
                            print(e)

                ## CALL THE make_deposit FUNCTION HERE PASSING THE 
                ## VARIABLES account AND amount DEFINED ABOVE AND 
                ## PRINT THE RESULTS:
                    print(make_deposit(account, amount))

            else:
                # User selected 'exit'
                keep_going = False

        except ValueError as e:
            # Invalid selection:
            print(e)

    print("Thank you for banking with PiXELL River Financial.")

if __name__ == "__main__":
    chatbot()



   




