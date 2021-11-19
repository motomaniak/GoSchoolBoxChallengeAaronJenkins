import Calculator  from "../classes/Calculator";

jest.mock('../classes/Calculator');

it('Should return the correct postfix expression', () => {
    expect(Calculator).not.toHaveBeenCalled();

    const calc = new Calculator([6, "*", 4, "+", 2, "^", 5, "-", 3]);
    let postfix = calc.InfixToPostfix();
    expect(postfix).toEqual([6, 4, "*", 2, 5, "^", "+", 3, "-"]);
});