"use client";

import React, { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const Page = () => {
  const [itemName, setItemName] = useState("");
  const [response, setResponse] = useState("");

  const handleSave = async () => {
    try {
      const response = await axios.post(
        "http://localhost/react-is/app/api/item_reg.php",
        { item_name: itemName, save: true }
      );
      console.log(response.data);
      setResponse(response.data); // Set the response from the server

      // Refetch items to update the table
      fetchItems();
    } catch (error) {
      console.error("Error saving item:", error);
      // Handle error
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Register an Item</CardTitle>
        <CardDescription>We can add the items here</CardDescription>
      </CardHeader>
      <CardContent>
        <Input
          name="item_name"
          placeholder="Item Name"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
        />
      </CardContent>
      <CardFooter className="border-t px-6 py-4">
        <Button onClick={handleSave}>Save</Button>
        {/* Conditionally render the alert */}
        {response && (
          <Alert>
            <AlertTitle>Success!</AlertTitle>
            <AlertDescription>{response}</AlertDescription>
          </Alert>
        )}
      </CardFooter>
    </Card>
  );
};

export default Page;
