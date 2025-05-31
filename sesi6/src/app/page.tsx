"use client";
import { getUsers } from "@/client/users";
import { createUser } from "@/server/users";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { use } from "react";

interface User{
  id: number,
  name:string;
}

export default function Home() {
  const query = useQuery({queryKey: ['users'], queryFn: getUsers})
  const queryClient = useQueryClient()

  const createUserMutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
  })


  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      
      <button className="bg-red-500" onClick={() => createUserMutation.mutate({id:1, name: "New User"})}>
        create User
      </button>

      {query.data?.map((user:User) => (
        <div key={user.id}>
          <h2>{user.name}</h2>
        </div>
      ))}
    </div>
  );
}
