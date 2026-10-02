const fs = require("fs");
const connectDB = require("./db");

async function generateReport() {

    const db = await connectDB();

    const orders = await db
        .collection("orders")
        .find({status : "delivered"})
        .toArray();

    console.log(`Found ${orders.length} delivered orders`);

    const totalRevenue = orders.reduce(
        (total, order) => total + Number(order.grandTotal),
        0
    );

    const report = [
        "Sales Report",
        "============",
        "",
        `Total Orders: ${orders.length}`,
        `Total Revenue: ₹${totalRevenue}`,
        "",
        "Order ID,              Product,      Amount"
    ];

    for (const order of orders) {

        report.push(
            `${order.orderNumber},      ${order.items[0].productName},        ${order.grandTotal}`
        );
    }

    fs.writeFileSync(
        "/reports/sales-report.csv",
        report.join("\n")
    );

    console.log("Report generated successfully");
    console.log(report);

    await process.exit(0);
}

generateReport().catch(error => {

    console.error("Report generation failed:", error);

    process.exit(1);
});