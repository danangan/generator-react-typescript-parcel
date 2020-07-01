import React from 'react';
import {render} from "@testing-library/react";
import Button from "./index";

describe('Button', () => {
  it('should render button without error', () => {
    render(<Button />);
  })
});
