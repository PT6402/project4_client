import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BookStatisticsChart = ({ statistics }) => {
    // Calculate total sales
    const totalSales = statistics.reduce((acc, stat) => acc + stat.sales, 0);

    const data = {
        labels: ['Total Books', 'Bought Books', 'Rented Books'],
        datasets: [
            {
                label: 'Books Data',
                data: [
                    statistics.reduce((acc, stat) => acc + stat.totalBooks, 0),
                    statistics.reduce((acc, stat) => acc + stat.boughtBooks, 0),
                    statistics.reduce((acc, stat) => acc + stat.rentedBooks, 0)
                ],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                ],
                borderWidth: 1,
            }
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Book Statistics',
            },
        },
    };

    return (
        <div style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '8px' }}>
            <div style={{ marginBottom: '20px', textAlign: 'center' }}>
                <h3>Total Sales</h3>
                <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>${totalSales.toFixed(2)}</p>
            </div>
            <Bar data={data} options={options} />
        </div>
    );
};

export default BookStatisticsChart;
