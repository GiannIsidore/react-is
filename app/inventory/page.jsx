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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { MoreHorizontal } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const previewInventory = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(
          "http://localhost/react-is/app/api/item_prev.php"
        );
        setItems(response.data);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchItems();
  }, []);
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Products</CardTitle>
          <CardDescription>
            Manage your products and view their sales performance.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
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
                <TableHead className="hidden md:table-cell">Options</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{item.item_id}</TableCell>
                  <TableCell className="font-medium">
                    {item.item_name}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">Draft</Badge>
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
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
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
