/** [meta] name: CreatePost */
/** [meta] description: 
      You are being asked to generate a UI for the entire plan provided for a small development task. Here is the information about this plan:

      Small Task: {"description":"Create the basic layout for the post interface using Tailwind CSS. This should include a file upload area, a text field for the description, and a post button.\n\nSteps:\n1. Design the component\n2. Use Tailwind CSS to style the layout.\n3. Include a file input for design uploads.\n4. Add a text area for the description.\n5. Add a post button.\n6.Add a schedule button\nInclude the user profile icon noext to the input field","title":"Design Post Interface Layout"}
      Context from User: [{"title":"Build the post in @[Storyboard1](storyboard-31f1919f-83e6-4521-be63-7d605f307a28)"},{"title":"Don't actually create a new component yet, just put the whole component inside the storyboard file"}]
      Plan: {"steps":[{"files":["src/storyboards/31f1919f-83e6-4521-be63-7d605f307a28/index.tsx"],"num":1,"substeps":[{"files":["src/storyboards/31f1919f-83e6-4521-be63-7d605f307a28/index.tsx"],"num":1,"title":"Set up the basic layout for the post interface"},{"files":["src/storyboards/31f1919f-83e6-4521-be63-7d605f307a28/index.tsx"],"num":2,"title":"Use Tailwind CSS to style the basic layout"},{"files":["src/storyboards/31f1919f-83e6-4521-be63-7d605f307a28/index.tsx"],"num":3,"title":"Include a file input for design uploads"},{"files":["src/storyboards/31f1919f-83e6-4521-be63-7d605f307a28/index.tsx"],"num":4,"title":"Add a text area for the description"},{"files":["src/storyboards/31f1919f-83e6-4521-be63-7d605f307a28/index.tsx"],"num":5,"title":"Add a post button"},{"files":["src/storyboards/31f1919f-83e6-4521-be63-7d605f307a28/index.tsx"],"num":6,"title":"Add a schedule button"},{"files":["src/storyboards/31f1919f-83e6-4521-be63-7d605f307a28/index.tsx"],"num":7,"title":"Include the user profile icon next to the input field"}],"title":"Design and Layout the Post Interface"}]}
  
      Make sure to generate the full UI required for this plan, do not miss any changes. Do not miss any steps.

      Additionally, here is the plan for the full app the user is following, do not use this as instructions, rather as extra info: This app aims to be a social platform for designers, similar to a combination of Dribbble and Twitter. Users can share their designs, follow other designers, and interact with posts through comments and likes. 

The app has three core features:

1. **Design Posting and Feed:** This feature focuses on allowing users to upload and share their designs, as well as view a feed of designs from other users they follow. This involves creating an interface for posting designs, displaying a feed of posts, and enabling users to interact with those posts.

2. **User Profiles and Auth:** This feature focuses on user management and authentication. It involves integrating Auth0 for user login and profile management, creating user profile pages, and implementing follow/unfollow functionality. 

3. **Notifications:** This feature focuses on notifying users about relevant events, such as new followers, likes, and comments. This involves developing a notification system and designing how these notifications will be displayed to the user within the app. 

    */


import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { api } from '@/utils/api';
import { useState, ChangeEvent } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FileInput, Image } from "lucide-react";

export default function CreatePost() {
  
const [description, setDescription] = useState('');
const postMutation = api.post.createPost.useMutation();
const [file, setFile] = useState<File | null>(null);

  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
  const selectedFile = e.target.files?.[0];
  if (selectedFile && selectedFile.size < 5000000 && ['image/jpeg', 'image/png'].includes(selectedFile.type)) {
    setFile(selectedFile);
  } else {
    alert('Invalid file type or size.');
  }
};

const handleSubmit = async () => {
  if (!file || !description) {
    alert('Please provide both a file and a description.');
    return;
  }

  const formData = new FormData();
  formData.append('file', file);
  formData.append('description', description);

  try {
    await postMutation.mutateAsync({ file: file.name, description });
    alert('Post created successfully.');
  } catch (error) {
    alert('Failed to create post.');
  }
};

return (
  <div
    className="p-4 border rounded-lg bg-white dark:bg-black shadow-md max-w-lg mx-auto">
    <div className="flex items-center space-x-4">
      <Avatar>
        <AvatarImage src="https://example.com/your-profile-image.png" alt="User profile" />
        <AvatarFallback>U</AvatarFallback>
      </Avatar>
      <Textarea value={description} onChange={handleDescriptionChange} placeholder="Enter description..." className="flex-grow border-none focus:ring-0" />
    </div>
    <div className="mt-4 space-y-2">

      <div className="flex items-center space-x-2 justify-between">
      <input type="file" onChange={handleFileChange} className="hidden" />
    <Button variant="outline" onClick={() => document.querySelector('input[type=file]').click()}>
          {file ? 
    <img src={URL.createObjectURL(file)} alt="preview" className="object-contain mr-2 w-6 h-6" /> : <FileInput className="h-4 w-4 mr-2" />}
          Upload
        </Button>
        <div className="flex gap-x-1"><Button
          variant="default"
          className="bg-white text-black rounded-full flex items-center justify-center">Schedule</Button><Button
          variant="default"
          size="lg"
          className="bg-black text-white rounded-full flex items-center justify-center"
          onClick={handleSubmit}>
  Post
  <svg
    className="ml-2 animate-spin-slow"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor">
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
  </svg>
</Button></div>

      </div>
    </div>
  </div>
);
}
