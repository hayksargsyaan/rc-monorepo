import React from 'react';

import { IButtonProps } from './types';

function Button({ text }: IButtonProps) {
  const content = 'This is Button component';
  return (
    <p>{text || content}</p>
  );
}

export default Button;
