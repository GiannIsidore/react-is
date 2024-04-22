"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const receiveItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [newSerialNumber, setNewSerialNumber] = useState("");
  const [newQuantity, setNewQuantity] = useState("");
  const fetchItems = async () => {
    try {
      const response = await axios.get(
        "http://localhost/react-is/app/api/item_receive.php"
      );
      console.log("API Response:", response.data); // Log the API response
      setItems(Array.isArray(response.data) ? response.data : []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching items:", error);
      setItems([]);
    }
  };

  useEffect(() => {
    // Call fetchItems inside useEffect
    fetchItems();
  }, []);
  const handleAddQuantity = async () => {
    try {
      await axios.post("http://localhost/react-is/app/api/item_receive.php", {
        add_item_id: selectedItem,
        add_serial_number: newSerialNumber,
        add_quantity: newQuantity,
        employee_id: sessionEmployeeId, // replace sessionEmployeeId with the actual employee_id from your session
      });
      // Refresh the items
      fetchItems();
    } catch (error) {
      console.error("Error adding quantity:", error);
    }
  };
  return (
    <div>
      <Card>
        <CardHeader className="px-5">
          <CardTitle>Items Receiving</CardTitle>
          <CardDescription>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">Add Quantity</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Edit Armory</DialogTitle>
                  <DialogDescription>
                    Make changes to Items here. Click save when you're done.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Item Status</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-6">
                        <div className="grid gap-3">
                          <Label htmlFor="status"></Label>
                        </div>
                        <div>
                          <select
                            value={selectedItem}
                            onChange={(e) => setSelectedItem(e.target.value)}
                            className="w-full px-3 py-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline"
                          >
                            {items.map((item, index) => (
                              <option value={item.item_id} key={index}>
                                {item.item_name}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <Input
                            placeholder="serial number"
                            value={newSerialNumber}
                            onChange={(e) => setNewSerialNumber(e.target.value)}
                          />
                          <br />
                          <Input
                            placeholder="total quantity"
                            value={newQuantity}
                            onChange={(e) => setNewQuantity(e.target.value)}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                <DialogFooter>
                  <button
                    onClick={handleAddQuantity}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
                  >
                    Save Changes
                  </button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Log ID</TableHead>
                <TableHead className="hidden sm:table-cell">
                  Item Name
                </TableHead>
                <TableHead className="hidden sm:table-cell">
                  Serial Number
                </TableHead>
                <TableHead className="hidden sm:table-cell">
                  Total Quantity
                </TableHead>
                <TableHead className="hidden md:table-cell">
                  Log Status
                </TableHead>
                <TableHead className="text-center">Log TimeStamp</TableHead>
                <TableHead className="text-center">Received By</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item, index) => (
                <TableRow className="bg-accent" key={index}>
                  <TableCell>{item.logs_timestamp_id}</TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {item.item_name}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <Badge className="text-xs" variant="secondary">
                      {item.item_serial_number}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {item.item_quantity}
                  </TableCell>
                  <TableCell className="text-start">
                    {item.log_status_name}
                  </TableCell>
                  <TableCell className="text-center">
                    {item.logs_timestamp}
                  </TableCell>
                  <TableCell className="text-center">
                    {" "}
                    <div className="font-medium">{item.employee_lname}</div>
                    <div className="hidden text-sm text-muted-foreground md:inline">
                      {item.employee_fname}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default receiveItems;
