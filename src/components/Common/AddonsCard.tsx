import { Col, Input, Row } from "antd";
import { useContext, useEffect, useState } from "react";
import { getAddonList } from "../../api";
import { AppContext } from "../../states/app.context";
import { IAddons } from "../../types";

export const AddOnsCard = () => {
  const { selectedAddons, setSelectedAddons } = useContext(AppContext);
  const [addOns, setAddOns] = useState<IAddons[]>([]);
  const [total, setTotal] = useState(0);
  const isChecked = (code: number | string): boolean => {
    return !!selectedAddons[code];
  };
  const getTotal = () => {
    const sums = Object.values(selectedAddons).map((item: any) => {
      return item.item.cost * item.qty;
    });
    setTotal(sums.reduce((sum: number, cost: number) => sum + cost, 0));
  };

  const handleCheck = (e: any, item: IAddons) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedAddons({ ...selectedAddons, [value]: { item, qty: 1 } });
    } else {
      const newSelection = { ...selectedAddons };
      delete newSelection[value];
      setSelectedAddons(newSelection);
    }
  };

  const handleQty = (e: any, code: number | string) => {
    if (selectedAddons[code]) {
      const update = { ...selectedAddons[code], qty: e.target.valueAsNumber };
      setSelectedAddons({ ...selectedAddons, [code]: update });
    }
  };

  const gettingAddOns = async () => {
    const addonList = await getAddonList();
    if (addonList) setAddOns(addonList);
  };

  useEffect(() => {
    getTotal();
    gettingAddOns();
  }, [selectedAddons]);
  return (
    <div className="builder_item">
      <div className="builder_card">
        <p>Add Ons</p>
        <p>Qty</p>
        <p>Cost</p>
      </div>
      {addOns.map((addons: IAddons) => (
        <div className="builder_card" key={addons.code}>
          <span className="flex">
            <input
              type="checkbox"
              value={addons.code}
              onClick={(e) => handleCheck(e, addons)}
              checked={isChecked(addons.code)}
              key={addons.code}
            />
            {addons.name}
          </span>
          <span>
            {" "}
            <Input
              size="small"
              disabled={!isChecked(addons.code)}
              type="number"
              onChange={(e) => handleQty(e, addons.code)}
              min={1}
              value={selectedAddons[addons.code]?.qty || 0}
            />{" "}
          </span>
          <span>$ {addons.cost}</span>
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
