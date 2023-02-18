import { Col, Input, Row } from "antd";
import { useContext, useEffect, useState } from "react";
import { getTherapyList } from "../../api";
import { AppContext } from "../../states/app.context";
import { ITherapy } from "../../types";

export const TherapyCard = () => {
  const { selectedTherapy, setSelectedTherapy } = useContext(AppContext);
  const [therapies, setTherapies] = useState<ITherapy[]>([]);
  const [total, setTotal] = useState(0);
  const isChecked = (code: number | string): boolean => {
    return !!selectedTherapy[code];
  };
  const getTotal = () => {
    const sums = Object.values(selectedTherapy).map((item: any) => {
      return item.item.cost * item.qty;
    });
    setTotal(sums.reduce((sum: number, cost: number) => sum + cost, 0));
  };

  const handleCheck = (e: any, therapy: ITherapy) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedTherapy({ ...selectedTherapy, [value]: { item: therapy, qty: 1 } });
    } else {
      const newSelection = { ...selectedTherapy };
      delete newSelection[value];
      setSelectedTherapy(newSelection);
    }
  };

  const handleQty = (e: any, code: number | string) => {
    if (selectedTherapy[code]) {
      const update = { ...selectedTherapy[code], qty: e.target.valueAsNumber };
      setSelectedTherapy({ ...selectedTherapy, [code]: update });
    }
  };

  const gettingTherapyList = async () => {
    const therapyList = await getTherapyList();
    if (therapyList) setTherapies(therapyList);
  };

  useEffect(() => {
    getTotal();
    gettingTherapyList();
  }, [selectedTherapy]);
  return (
    <div className="builder_item">
      <div className="builder_card">
        <p>Therapy</p>
        <p>Qty</p>
        <p>Cost</p>
      </div>
      {therapies.map((therapy) => (
        <div className="builder_card" key={therapy.code}>
          <span className="flex">
            <input
              type="checkbox"
              value={therapy.code}
              onClick={(e) => handleCheck(e, therapy)}
              checked={isChecked(therapy.code)}
              key={therapy.code}
            />
            {therapy.code}
          </span>
          <span>
            {" "}
            <Input
              size="small"
              disabled={!isChecked(therapy.code)}
              type="number"
              onChange={(e) => handleQty(e, therapy.code)}
              min={1}
              value={selectedTherapy[therapy.code]?.qty || 0}
            />{" "}
          </span>
          <span>$ {therapy.cost}</span>
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
