import { Button, InputNumber } from "antd";
import React from "react";
import { useRecoilState } from "recoil";
import { AutoBidSettings } from "../../store/atoms/atom";
const { memo } = React;

export const AutoBidController = memo(() => {
  const [inputNumber, setInputNumber] = React.useState<number>(0);
  const [autoBidSettings, setAutoBidSettings] = useRecoilState(AutoBidSettings);

  return (
    <div>
      <p>Current Balance : {autoBidSettings?.maxBidAmount}</p>
      <p>Max Bid Amount</p>
      <InputNumber
        value={inputNumber}
        onChange={(value) => setInputNumber(Number(value))}
      />
      <Button
        type="ghost"
        onClick={() => setAutoBidSettings({ maxBidAmount: inputNumber })}
      >
        Save
      </Button>
    </div>
  );
});
