const Dropdown = ({ options, onChange}) =>(
  <select 
    className="bg-white px-2 py-2 rounded-lg border-zinc-700 outline-none cursor-pointer"
    onChange={onChange}>
      <option value="">Select</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
);
export default Dropdown;