type CheckboxType = {
    id: number, label: string, isChecked: boolean, value: string | number, setIsChecked: (id: number, value: string | number) => void,
}

const Checkbox = ({ id, label, isChecked, setIsChecked, value }: CheckboxType) => {

    return (
        <div className={`checkbox__wrapper ${isChecked ? "checkbox-checked" : ""}`}>
            <label>
                <input type="checkbox"
                    checked={isChecked}
                    onChange={() => setIsChecked(id, value)}
                />
                <img src="images/icons/checkbox.png" alt="" />
                <span>{label}</span>
            </label>
        </div>
    );
};
export default Checkbox;