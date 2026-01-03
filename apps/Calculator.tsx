/*
 Copyright (c) 2026 Ashraf Morningstar
 These are personal recreations of existing projects, developed by Ashraf Morningstar
 for learning and skill development.
 Original project concepts remain the intellectual property of their respective creators.
 Repository: https://github.com/AshrafMorningstar
*/

/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

/**
 * @file Calculator.tsx
 * @author Ashraf Morningstar <https://github.com/AshrafMorningstar>
 * @copyright 2025 Ashraf Morningstar
 * @license MIT
 *
 * 🌌 Archonic Codex - The Universal Knowledge Engine
 * "The future is unwritten, but the code is compiled."
 */

import React, { useState } from 'react';
import { Beaker } from 'lucide-react';

export const Calculator: React.FC = () => {
  const [display, setDisplay] = useState('0');
  const [prevValue, setPrevValue] = useState<string | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [scientificMode, setScientificMode] = useState(false);

  const inputDigit = (digit: string) => {
    if (waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  };

  const performOperation = (nextOperator: string) => {
    const inputValue = parseFloat(display);

    if (prevValue === null) {
      setPrevValue(String(inputValue));
    } else if (operator) {
      const currentValue = prevValue ? parseFloat(prevValue) : 0;
      const newValue = calculate(currentValue, inputValue, operator);
      setPrevValue(String(newValue));
      setDisplay(String(newValue));
    }

    setWaitingForOperand(true);
    setOperator(nextOperator);
  };

  const calculate = (prev: number, next: number, op: string) => {
    switch (op) {
      case '+': return prev + next;
      case '-': return prev - next;
      case '*': return prev * next;
      case '/': return prev / next;
      case '^': return Math.pow(prev, next);
      default: return next;
    }
  };

  const calculateScientific = (func: string) => {
      const current = parseFloat(display);
      let result = 0;
      switch(func) {
          case 'sin': result = Math.sin(current); break;
          case 'cos': result = Math.cos(current); break;
          case 'tan': result = Math.tan(current); break;
          case 'sqrt': result = Math.sqrt(current); break;
          case 'log': result = Math.log10(current); break;
          case 'ln': result = Math.log(current); break;
      }
      setDisplay(String(result));
      setWaitingForOperand(true);
  }

  const reset = () => {
    setDisplay('0');
    setPrevValue(null);
    setOperator(null);
    setWaitingForOperand(false);
  };

  const handlePercentage = () => {
    const currentValue = parseFloat(display);
    if (currentValue === 0) return;
    const fixed = (currentValue / 100).toString();
    setDisplay(fixed);
  };

  const toggleSign = () => {
    const currentValue = parseFloat(display);
    if (currentValue === 0) return;
    setDisplay(String(currentValue * -1));
  };

  const Button = ({ label, type = 'default', onClick, wide = false, small = false }: any) => {
    let bg = 'bg-[#333333] hover:bg-[#4d4d4d]';
    let text = 'text-white';
    
    if (type === 'operator') {
      bg = 'bg-[#ff9f0a] hover:bg-[#ffb23f]';
      text = 'text-white';
    } else if (type === 'function') {
      bg = 'bg-[#a5a5a5] hover:bg-[#d4d4d4]';
      text = 'text-black';
    } else if (type === 'sci') {
        bg = 'bg-[#212121] hover:bg-[#303030]';
        text = 'text-gray-200';
    }

    return (
      <button
        onClick={onClick}
        className={`${wide ? 'col-span-2' : ''} ${small ? 'h-10 text-sm' : 'h-14 text-2xl'} rounded-full font-medium transition-colors ${bg} ${text} active:brightness-125`}
      >
        {label}
      </button>
    );
  };

  return (
    <div className="h-full bg-black p-4 flex flex-col">
      <div className="flex justify-between items-start">
          <button onClick={() => setScientificMode(!scientificMode)} className="text-gray-500 hover:text-white">
              <Beaker size={20} />
          </button>
      </div>
      <div className="flex-1 flex items-end justify-end p-4 mb-2">
        <div className="text-5xl font-light text-white break-all text-right">{display}</div>
      </div>
      
      <div className={`grid gap-3 ${scientificMode ? 'grid-cols-5' : 'grid-cols-4'}`}>
        {scientificMode && (
            <>
                <Button label="sin" type="sci" small onClick={() => calculateScientific('sin')} />
                <Button label="cos" type="sci" small onClick={() => calculateScientific('cos')} />
                <Button label="tan" type="sci" small onClick={() => calculateScientific('tan')} />
                <Button label="log" type="sci" small onClick={() => calculateScientific('log')} />
                <Button label="ln" type="sci" small onClick={() => calculateScientific('ln')} />
                <Button label="√" type="sci" small onClick={() => calculateScientific('sqrt')} />
                <Button label="^" type="sci" small onClick={() => performOperation('^')} />
                <Button label="π" type="sci" small onClick={() => setDisplay(String(Math.PI))} />
                <Button label="e" type="sci" small onClick={() => setDisplay(String(Math.E))} />
                <Button label="!" type="sci" small /> 
            </>
        )}
        
        <Button label={display === '0' ? 'AC' : 'C'} type="function" onClick={reset} />
        <Button label="+/-" type="function" onClick={toggleSign} />
        <Button label="%" type="function" onClick={handlePercentage} />
        <Button label="÷" type="operator" onClick={() => performOperation('/')} />
        
        <Button label="7" onClick={() => inputDigit('7')} />
        <Button label="8" onClick={() => inputDigit('8')} />
        <Button label="9" onClick={() => inputDigit('9')} />
        <Button label="×" type="operator" onClick={() => performOperation('*')} />
        
        <Button label="4" onClick={() => inputDigit('4')} />
        <Button label="5" onClick={() => inputDigit('5')} />
        <Button label="6" onClick={() => inputDigit('6')} />
        <Button label="−" type="operator" onClick={() => performOperation('-')} />
        
        <Button label="1" onClick={() => inputDigit('1')} />
        <Button label="2" onClick={() => inputDigit('2')} />
        <Button label="3" onClick={() => inputDigit('3')} />
        <Button label="+" type="operator" onClick={() => performOperation('+')} />
        
        <Button label="0" wide onClick={() => inputDigit('0')} />
        <Button label="." onClick={() => inputDigit('.')} />
        <Button label="=" type="operator" onClick={() => performOperation('=')} />
      </div>
    </div>
  );
};