"use client";
import React, { useState } from "react";
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "react-beautiful-dnd";

import { Providers } from "../provivers";
import styles from "./styles.module.scss";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { v4 as uuidv4 } from 'uuid';

interface DraggableItemInterface {
  id: string;
  content: string;
}

const grid = 8;

const getItems = (count: number, offset = 0) =>
  Array.from({ length: count }, (v, k) => k).map((k) => ({
    id: `item-${k + offset}-${new Date().getTime()}`,
    content: `item ${k + offset}`,
  }));

const reorder = (
  list: DraggableItemInterface[],
  startIndex: number,
  endIndex: number
) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle,
});

export default function Home() {
  // const [state, setState] = useState([getItems(10), getItems(5, 10)]);
  const [input, setInput] = useState("");

  const [items, setItems] = useState<DraggableItemInterface[]>([
    {
      id: "1",
      content: "Item 1",
    },
    {
      id: "2",
      content: "Item 2",
    },
    {
      id: "3",
      content: "Item 3",
    },
  ]);

  const getItemStyle = (isDragging: Boolean, draggableStyle: any) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    background: isDragging ? "lightgreen" : "white",

    // styles we need to apply on draggables
    ...draggableStyle,
  });

  const getListStyle = (isDraggingOver: Boolean) => ({
    background: isDraggingOver ? "lightblue" : "white",
    padding: grid,
  });

  const reorder = (
    list: any,
    startIndex: number,
    endIndex: number
  ): DraggableItemInterface[] => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result as DraggableItemInterface[];
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const cloneItems = reorder(
      items,
      result.source.index,
      result.destination.index
    );

    setItems(cloneItems);

    // setItems(cloneItems)
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  }

  const isError = input === "";

  const handleCreateItem = () => {
    console.log('item inpuut--->', input)
    const cloneItems = [...items];
    cloneItems.push({
      id: uuidv4(),
      content: input,
    })

    setItems(cloneItems);
    setInput('');
  }
  return (
    <Providers>
      <div className={styles.container}>
        <div className={styles.pdfContainer}>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
              {(provided, snapshot) => (
                <div
                  {...provided.droppableProps}
                  className={styles.droppableItem}
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}
                >
                  {items.map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          className={styles.itemDrag}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                          )}
                        >
                          {item.content}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
        <div className={styles.formCreate}>
          <FormControl isInvalid={isError}>
            <FormLabel>Titlel</FormLabel>
            <Input type="email" value={input} onChange={(e) => handleInputChange(e)} />
            <Button className="mt-10" type="submit" onClick={handleCreateItem}>Submit</Button>
          </FormControl>
        </div>
      </div>
    </Providers>
  );
}
