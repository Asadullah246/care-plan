import { Col, Input, Row } from "antd";
import { useContext, useEffect, useState } from "react";
import { getXrayList } from "../../api";
import { AppContext } from "../../states/app.context";
import { IXrays } from "../../types";

export const XrayCard = () => {
  const { selectedXray, setSelectedXray } = useContext(AppContext);
  const [allXray, setAllXray] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const isChecked = (code: number | string): boolean => {
    return !!selectedXray[code];
  };

  const getTotal = () => {
    const sums = Object.values(selectedXray).map((item: any) => {
      return item.item.cost * item.qty;
    });
    setTotal(sums.reduce((sum: number, cost: number) => sum + cost, 0));
  };

  const handleCheck = (e: any, item: IXrays) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedXray({ ...selectedXray, [value]: { item, qty: 1 } });
    } else {
      const newSelection = { ...selectedXray };
      delete newSelection[value];
      setSelectedXray(newSelection);
    }
  };

  const handleQty = (e: any, code: number | string) => {
    if (selectedXray[code]) {
      const update = { ...selectedXray[code], qty: e.target.valueAsNumber };
      setSelectedXray({ ...selectedXray, [code]: update });
    }
  };

  const loadXray = async () => {
    const res = await getXrayList();
    setAllXray(res);
  };

  useEffect(() => {
    loadXray();
  }, []);

  useEffect(() => {
    getTotal();
  }, [selectedXray]);
  return (
    <div className="builder_item">
      <div className="builder_card">
        <p>Xrays</p>
        <p>Qty</p>
        <p>Cost</p>
      </div>
      {allXray.map((xray) => (
        <div className="builder_card" key={xray.code}>
          <span className="flex">
            <input
              type="checkbox"
              value={xray.code}
              onClick={(e) => handleCheck(e, xray)}
              checked={isChecked(xray.code)}
              key={xray.code}
            />
            {xray.code}
          </span>
          <span>
            {" "}
            <Input
              size="small"
              disabled={!isChecked(xray.code)}
              type="number"
              onChange={(e) => handleQty(e, xray.code)}
              min={1}
              value={selectedXray[xray.code]?.qty || 0}
            />{" "}
          </span>
          <span>$ {xray.cost}</span>
        </div>
      ))}
      <Row justify="space-around">
        <Col>
          Total <br />${total}
        </Col>
        <Col>
          1x Payment <br />${total}
        </Col>
        <Col>
          Monthly <br />${total / 4}
        </Col>
      </Row>
    </div>
  );
};
