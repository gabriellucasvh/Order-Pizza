"use client"

import { useState } from "react";
import { Plus, ArrowRight } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";

type OrderStatus = "a-fazer" | "pronto" | "a-caminho" | "entregue";

type Order = {
    id: number
    customerName: string
    pizzaType: string
    status: OrderStatus
}

export default function Menu() {
    const [orders, setOrders] = useState<Order[]>([])
    const [customerName, setCustomerName] = useState("")
    const [pizzaType, setPizzaType] = useState("")

    const addOrder = () => {
        if (customerName && pizzaType) {
            const newOrder: Order = {
                id: Date.now(),
                customerName,
                pizzaType,
                status: "a-fazer",
            }
            setOrders([...orders, newOrder])
            setCustomerName("")
            setPizzaType("")
        }
    }
    const moveOrder = (id: number, newStatus: OrderStatus) => {
        setOrders(
            orders.map((order) =>
                order.id === id ? { ...order, status: newStatus } : order
            )
        )
    }
    const getOrdersByStatus = (status: OrderStatus) =>
        orders.filter((order) => order.status === status)

    const getOrderByStatus = (status: OrderStatus) =>
        orders.filter((order) => order.status === status)

    const renderOrderList = (status: OrderStatus, title: string, nextStatus?: OrderStatus) => (
        <Card className="mb-6">
            <CardHeader>
                <CardTitle>
                    {title}
                </CardTitle>
            </CardHeader>
            <CardContent>
                {getOrdersByStatus(status).map((order) => (
                    <Card key={order.id} className="mb-2">
                        <CardContent className="flex justify-between items-center p-4">
                            <div>
                                <p className="font-semibold">{order.customerName}</p>
                                <p className="text-sm text-gray-500">{order.pizzaType}</p>
                            </div>
                            {nextStatus && (
                                <Button onClick={() => moveOrder(order.id, nextStatus)} size="sm">
                                    Próximo
                                    <ArrowRight className="mr-2 h-4 w-4" />
                                </Button>
                            )}
                        </CardContent>
                    </Card>
                ))}
            </CardContent>
        </Card>
    )
    return (
        <div className="container mx-auto p-4">
            <Card className="mb-6">
                <CardHeader>
                    <CardTitle> Gerenciamento da pizzaria</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex space-x-2">
                        <Input
                            placeholder="Nome do cliente"
                            value={customerName}
                            onChange={(e) => setCustomerName(e.target.value)}
                        />
                        <Input
                            placeholder="Tipo de pizza"
                            value={pizzaType}
                            onChange={(e) => setPizzaType(e.target.value)}
                        />
                        <Button onClick={addOrder}>
                            <Plus className="mr-2 h-4 w-4" /> Adicionar pedido
                        </Button>
                    </div>
                </CardContent>
            </Card>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {renderOrderList("a-fazer", "A fazer", "pronto")}
                {renderOrderList("pronto", "Pronto", "a-caminho")}
                {renderOrderList("a-caminho", "A caminho", "entregue")}
                {renderOrderList("entregue", "Entregue")}
            </div>
        </div>
    )
}