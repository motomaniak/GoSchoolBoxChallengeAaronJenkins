export default class Calculator {
    constructor(expression){
        this.expression = expression;
    }

    sqrt(op1){
        return Math.sqrt(op1);
    }

    power(op1, op2){
        return Math.pow(op1, op2);
    }

    add(op1, op2){
        return Math.round((op1 + op2) * 100) / 100;
    }

    subtract(op1, op2){
        return op1 - op2;
    }

    multiply(op1, op2){
        return op1 * op2;
    }

    divide(op1, op2){
        try{
            if (op2 === 0) {
                throw new Error("Division by 0")
            }
        }catch (err) {
            return err.message;
        }
        return op1 / op2;
    }

    precedence(operand){
        switch(operand){
            case "^":
                return 4
            case "√":
                return 4
            case "*":
                return 3
            case "/":
                return 3
            case "+":
                return 2
            case "-":
                return 2
            default:
                return -1
        }
    }

    eval(operand, op2, op1 = 0){
        switch(operand){
            case "^":
                return this.power(op1, op2)
            case "√":
                return this.sqrt(op2)
            case "*":
                return this.multiply(op1, op2)
            case "/":
                return this.divide(op1, op2)
            case "+":
                return this.add(op1, op2)
            case "-":
                return this.subtract(op1, op2)
            default:
                return 0
        }
    }

    evaluate(){
        let postfix = this.InfixToPostfix();
        let stack = [];
        for(let i = 0; i < postfix.length; i++){
            if(isNaN(postfix[i])){
                let result;
                if (postfix[i] === "√") {
                    result = this.eval(postfix[i], stack.pop());
                } else {
                    result = this.eval(postfix[i], stack.pop(), stack.pop());
                }
                if (result === "Division by 0") {
                    return result;
                }
                stack.push(result)
            }else{
                stack.push(postfix[i])
            }
        }
        return stack[0];
    }

    InfixToPostfix(){
        //No input (uses this.expression)
        //returns array  
        //Converts an infix expression i.e. 6*4+2^5-3 to postfix (reverse polish notation) 6 4 * 2 5 ^ + 3 -

        let postfix_expression = [];
        let stack = [];
        for (let i = 0; i < this.expression.length; i++) {
            if (!isNaN(this.expression[i])) {
                postfix_expression.push(this.expression[i])
            } else if (this.expression[i] === "(") {
                stack.push(this.expression[i])
            }
            else if (this.expression[i] === ")") {
                while (stack[stack.length - 1] !== "(") {
                    postfix_expression.push(stack.pop())
                }
                stack.pop()
            } else if (isNaN(this.expression[i]) && (this.expression[i] !== "(" || this.expression !== ")")) {
                if (stack.length === 0) {
                    stack.push(this.expression[i]);
                } else if (this.precedence(this.expression[i]) >= this.precedence(stack[stack.length - 1])) {
                    stack.push(this.expression[i]);
                } else {
                    while (stack.length > 0 && this.precedence(stack[stack.length - 1]) >= this.precedence(this.expression[i])) {
                        postfix_expression.push(stack.pop());
                    }
                    stack.push(this.expression[i]);
                }
            }
        }

        while (stack.length > 0) {
            postfix_expression.push(stack.pop())
        }

        return postfix_expression;
    }
}