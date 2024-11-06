import { fireEvent, render, screen } from '@testing-library/react';
import SendButton from './SendButton';

describe('Send Button', () => {
  let count = 0;

  const incrementCount = () => {
    count++;
  };

  test('Dont increment count when button disabled', async () => {
    const submitIsDisabled = true;
    render(
      <SendButton handleClick={incrementCount} hasText={submitIsDisabled} />,
    );

    const submit = await screen.findByTestId('submit-button');
    fireEvent.click(submit);

    expect(count).toEqual(0);
  });

  test('Increment count when button enabled', async () => {
    let count = 0;
    const submitIsDisabled = false;

    const incrementCount = () => {
      count++;
    };
    render(
      <SendButton handleClick={incrementCount} hasText={submitIsDisabled} />,
    );

    const submit = await screen.findByTestId('submit-button');
    fireEvent.click(submit);

    expect(count).toEqual(1);
  });
});
