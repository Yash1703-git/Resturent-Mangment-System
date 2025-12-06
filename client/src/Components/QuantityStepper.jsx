import React from 'react';
export default function QuantityStepper({ qty, onInc, onDec }) {
  return (
    <div className="inline-flex items-center border rounded">
      <button onClick={onDec} className="px-2">-</button>
      <div className="px-3">{qty}</div>
      <button onClick={onInc} className="px-2">+</button>
    </div>
  );
}
