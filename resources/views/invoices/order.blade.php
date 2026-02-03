<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <title>Invoice {{ $order->order_number }}</title>
    <style>
        body { font-family: DejaVu Sans, sans-serif; font-size: 12px; }
        table { width: 100%; border-collapse: collapse; }
        th, td { border: 1px solid #ddd; padding: 6px; text-align: left; }
        th { background: #f3f4f6; }
        h1 { font-size: 18px; }
    </style>
    </head>
<body>
    <h1>Invoice #{{ $order->order_number }}</h1>
    <p>Date: {{ $order->created_at->format('Y-m-d') }}</p>
    <p>
        <strong>Customer:</strong> {{ $order->customer_name }}<br>
        <strong>Phone:</strong> {{ $order->customer_phone }}<br>
        <strong>Address:</strong> {{ $order->shipping_address_line1 }} {{ $order->shipping_address_line2 }} {{ $order->shipping_city }} {{ $order->shipping_state }} {{ $order->shipping_postal_code }} {{ $order->shipping_country }}
    </p>

    <table>
        <thead>
            <tr>
                <th>Product</th>
                <th>Qty</th>
                <th>Unit Price</th>
                <th>Total</th>
            </tr>
        </thead>
        <tbody>
            @foreach($order->items as $item)
                <tr>
                    <td>{{ $item->product_name }}</td>
                    <td>{{ $item->quantity }}</td>
                    <td>{{ number_format($item->unit_price, 2) }}</td>
                    <td>{{ number_format($item->line_total, 2) }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>

    <p style="text-align:right;">
        Subtotal: {{ number_format($order->subtotal, 2) }}<br>
        Discount: -{{ number_format($order->discount, 2) }}<br>
        Shipping: {{ number_format($order->shipping, 2) }}<br>
        <strong>Grand Total: {{ number_format($order->total, 2) }}</strong>
    </p>
</body>
</html>


