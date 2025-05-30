import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import './chart.css';

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AA66CC"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
}) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text
            x={x}
            y={y}
            fill="white"
            textAnchor={x > cx ? "start" : "end"}
            dominantBaseline="central"
        >
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

const Chart = ({ statisticData }) => {


    const data = [
        { name: "Total Products", value: statisticData.productCount },
        { name: "Accepted Products", value: statisticData.acceptedCount },
        { name: "Pending Products", value: statisticData.pendingCount },
        { name: "Reviews", value: statisticData.reviewCount },
        { name: "Users", value: statisticData.usersCount },
    ];

    return (
        <div className="chart-container w-full h-[400px] md:min-h-screen">
        
            <ResponsiveContainer width="100%" height="60%">
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={120}
                        fill="#8884d8"
                        dataKey="value"
                        nameKey="name"
                    >
                        {data.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={COLORS[index % COLORS.length]}
                            />
                        ))}
                    </Pie>
                </PieChart>

            </ResponsiveContainer>
            <ul className="text-center mt-4 font-medium">
                {data.map((item, idx) => (
                    <li key={idx} style={{ color: COLORS[idx % COLORS.length] }}>
                        ● {item.name}: {item.value}
                    </li>
                ))}
            </ul>

        </div>
    );
};

export default Chart;
