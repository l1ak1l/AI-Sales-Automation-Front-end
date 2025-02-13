"use client";

import { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Sidebar } from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import { CardSpotlightComponent } from "@/components/card-spotlight";
import { Briefcase, CheckSquare, Heart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";


export default function CallingPage() {
    const data = [
        { id: 1, name: "John Doe", phone: "123-456-7890", time: "10:00 AM", called: false, },
        { id: 2, name: "Jane Smith", phone: "987-654-3210", time: "2:00 PM", called: true, },
        { id: 3, name: "Alice Johnson", phone: "555-123-4567", time: "4:30 PM", called: false, },
        { id: 4, name: "John Doe", phone: "123-456-7890", time: "10:00 AM", called: false, },
        { id: 5, name: "Jane Smith", phone: "987-654-3210", time: "2:00 PM", called: true, },
        { id: 6, name: "Alice Johnson", phone: "555-123-4567", time: "4:30 PM", called: false, },
    ];

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="flex pt-16 flex-wrap">
                <Sidebar />
                <div className="flex-1 p-8 text-black min-w-screen">
                    <Card>
                        <CardHeader>
                            <CardTitle>Call List</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>No.</TableHead>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Phone Number</TableHead>
                                        <TableHead>Suitable Time to Call</TableHead>
                                        <TableHead>Called?</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {data.map((person) => (
                                        <TableRow key={person.id}>
                                            <TableCell>{person.id}</TableCell>
                                            <TableCell>{person.name}</TableCell>
                                            <TableCell>{person.phone}</TableCell>
                                            <TableCell>{person.time}</TableCell>
                                            <TableCell>{person.called ? "✅" : " "}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>

                <div className="container ">
                    <div className="flex-1 justify-center p-6">
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            <Card className="bg-white/80 text-gray-900 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-lg">
                                <CardHeader>
                                    <CardTitle>Total SMS</CardTitle>
                                    <CardDescription>Current month</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-3xl font-bold text-gray-900">16,060</p>
                                </CardContent>
                            </Card>
                            <Card className="bg-white/80 text-gray-900 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-lg">
                                <CardHeader>
                                    <CardTitle>Total Calls</CardTitle>
                                    <CardDescription>Current month</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-3xl font-bold text-gray-900">2,668</p>
                                </CardContent>
                            </Card>
                            <Card className="bg-white/80 text-gray-900 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-lg">
                                <CardHeader>
                                    <CardTitle>Total Emails</CardTitle>
                                    <CardDescription>Current month</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-3xl font-bold text-gray-900">250</p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
