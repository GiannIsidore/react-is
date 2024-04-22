// import React from "react";
// import { Button } from "@/components/ui/button";
// const inventory = () => {
//   return (
//     <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
//       <div className="flex flex-col items-center gap-1 text-center">
//         <h3 className="text-2xl font-bold tracking-tight">
//           You have no products
//         </h3>
//         <p className="text-sm text-muted-foreground">
//           You can start selling as soon as you add a product.
//         </p>
//         <Button className="mt-4">Add Product</Button>
//       </div>
//     </div>
//   );
// };

// export default inventory;

"use client";
import React, { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import axios from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { MoreHorizontal } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Reg from "./register/page";

const previewInventory = () => {
  const [itemName, setItemName] = useState("");
  const [itemId, setItemId] = useState("");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchItems = async () => {
    try {
      const response = await axios.get(
        "http://localhost/react-is/app/api/item_prev.php"
      );
      setItems(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);
  const handleDelete = async (item_id) => {
    try {
      if (!item_id) {
        console.error("Error deleting item: Item ID is missing or invalid");
        return;
      }

      console.log("Deleting item with ID:", item_id);
      const response = await axios.post(
        "http://localhost/react-is/app/api/soft_del_inv.php",
        { delete_item_id: item_id }
      );

      // Check the response data if needed
      console.log(response.data);
      // Refetch items after deleting
      fetchItems();
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };
  const handleEdit = async (old_item_id, new_item_name) => {
    try {
      if (!old_item_id) {
        console.error("Error editing item: Item ID is missing or invalid");
        return;
      }

      console.log("Editing item with ID:", old_item_id);
      console.log("New item name:", new_item_name);
      const response = await axios.post(
        "http://localhost/react-is/app/api/edit_inv.php",
        {
          edit_item_id: old_item_id,
          edit_item_name: new_item_name,
        }
      );

      // Check the response data if needed
      console.log(response.data);
      // Refetch items after editing
      fetchItems();

      // Reset itemName to its initial state
      setItemName("");
    } catch (error) {
      console.error("Error editing item:", error);
    }
  };
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Armory Items</CardTitle>
          <CardDescription>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">ADD ITEM</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <div className="grid gap-4 py-4">
                  <Reg />
                </div>
                <DialogFooter></DialogFooter>
              </DialogContent>
            </Dialog>
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex flex-col items-center justify-center ">
              <p>Loading Armory From our Database...</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead></TableHead>
                  <TableHead className="hidden md:table-cell">
                    Total Added
                  </TableHead>
                  <TableHead className="hidden md:table-cell">
                    Total Released
                  </TableHead>
                  <TableHead className="hidden md:table-cell">
                    Total Deleted
                  </TableHead>

                  <TableHead className="hidden md:table-cell">
                    Total Remaining Quantity
                  </TableHead>
                  <TableHead className="hidden md:table-cell">
                    Employee Name
                  </TableHead>
                  <TableHead className="hidden md:table-cell">
                    Options
                  </TableHead>
                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">
                      {item.item_id}
                    </TableCell>
                    <TableCell className="font-medium">
                      {item.item_name}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        <Dialog>
                          <DialogTrigger className="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 text-primary-500">
                            Edit
                          </DialogTrigger>
                          <DialogContent className="bg-gray-200 text-gray-700">
                            <DialogHeader className="bg-primary-500">
                              <DialogTitle className="text-primary-500">
                                Edit {item.item_name}
                              </DialogTitle>
                              <DialogDescription className="text-gray-600">
                                Make changes here. Click save when you're done.
                              </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                              <div className="grid grid-cols-4 items-center gap-4 p-4 bg-white shadow-lg rounded-lg">
                                <Label
                                  htmlFor="name"
                                  className="text-right text-gray-600"
                                >
                                  Name
                                </Label>
                                <Input
                                  id="name"
                                  value={itemName}
                                  onChange={(e) => setItemName(e.target.value)}
                                  className="col-span-3 bg-white text-gray-700 border-gray-300 rounded-lg shadow-sm p-2"
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4 p-4 bg-white shadow-lg rounded-lg mt-4">
                                <Label
                                  htmlFor="username"
                                  className="text-right text-gray-600"
                                >
                                  Id
                                </Label>
                                <Input
                                  type="text"
                                  value={item.item_id}
                                  readOnly
                                  className="col-span-3 bg-gray-200 text-gray-700 border-2 border-gray-300 rounded-lg shadow-sm p-2"
                                />
                              </div>
                            </div>
                            <DialogFooter>
                              <Button
                                type="submit"
                                onClick={() =>
                                  handleEdit(item.item_id, itemName)
                                }
                                className="bg-primary text-secondary hover:bg-primary-700"
                              >
                                Save changes
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {item.Total_added}
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-center">
                      {item.Total_released}
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-center">
                      {item.Total_deleted}
                    </TableCell>

                    <TableCell className="hidden md:table-cell text-center  ">
                      {item.Total_quantity}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {item.employee_lname}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            aria-haspopup="true"
                            size="icon"
                            variant="ghost"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="center"
                          className="flex items-center flex-col"
                        >
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>
                            <Button
                              onClick={() => handleDelete(item.item_id)}
                              key={item.item_id}
                              className="bg-red-500 text-white rounded-lg shadow-md p-2 hover:bg-red-700 transition-all duration-200 transform hover:scale-125"
                            >
                              Delete
                            </Button>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
        <CardFooter>
          <div className="text-xs text-muted-foreground">
            Showing <strong>1-10</strong> of <strong>32</strong> products
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default previewInventory;
