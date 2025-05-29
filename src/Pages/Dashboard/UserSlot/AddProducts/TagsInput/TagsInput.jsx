import React from "react";

import { WithContext as ReactTags } from "react-tag-input";

import "./tagInputStyle.css";

const TagsInput = ({tags, setTags}) => {
 
 

  const handleDelete = (index) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const onTagUpdate = (index, newTag) => {
    const updatedTags = [...tags];
    updatedTags.splice(index, 1, newTag);
    setTags(updatedTags);
  };

  const handleAddition = (tag) => {
    setTags([...tags, tag]);
  };

  const handleDrag = (tag, currPos, newPos) => {
    const newTags = tags.slice();
    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);
    setTags(newTags);
  };

  const handleTagClick = (index) => {
    console.log("The tag at index " + index + " was clicked");
  };

  const onClearAll = () => {
    setTags([]);
  };

  return (
    <div className="app">
      <ReactTags
        name="tags"
        tags={tags}
        inputFieldPosition="top"
        handleDelete={handleDelete}
        handleAddition={handleAddition}
        handleDrag={handleDrag}
        handleTagClick={handleTagClick}
        onTagUpdate={onTagUpdate}
        editable
        clearAll
        onClearAll={onClearAll}
        maxTags={7}
        allowAdditionFromPaste
      />
    </div>
  );
};

export default TagsInput;

