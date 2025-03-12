import { Legend } from "recharts";

const CustomLegendContent = (props: any) => {
  const { payload } = props;

  return (
    <div className="flex items-center justify-center gap-5">
      {payload.map((entry: any) => (
        <div key={entry.value} className="flex items-center gap-2">
          {/* Custom Dot */}
          <div
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              backgroundColor: entry.color,
            }}
          ></div>
          <span className='font-secondary font-semibold'>{entry.value}</span>
        </div>
      ))}
    </div>
  );
};

export default CustomLegendContent;