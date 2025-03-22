"use client";

import { useState } from "react";
import { searchUsers } from "@/actions/search-users";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<{ id: string; username: string; name: string | null; image: string | null;  emailAddresses?: { emailAddress: string }[] | undefined }[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // State for loader

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // Show skeletons

    const formData = new FormData();
    formData.append("query", query);

    const response = await searchUsers(formData);

    setLoading(false); // Hide skeletons when results arrive

    if (response.error) {
      setError(response.error);
      setResults([]);
    } else {
      setError("");
      setResults(response.users || []);
     
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSearch} className="flex gap-2">
        <Input
          type="text"
          placeholder="Search for users..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button type="submit">Search</Button>
      </form>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      <div className="mt-4">
        {loading ? (
          // Skeleton Loader (ShadCN)
          <div className="space-y-3">
            {[...Array(3)].map((_, index) => (
              <Card key={index} className="p-2 flex items-center gap-3">
                <Skeleton className="w-10 h-10 rounded-full" />
                <div>
                  <Skeleton className="h-4 w-32 mb-1" />
                  <Skeleton className="h-3 w-20" />
                </div>
              </Card>
            ))}
          </div>
        ) : (
          results.map((user) => (
            <Link
            href={`/profile/${
              user.username 
            }`}
          >
             <Card key={user.id} className="p-2 flex items-center gap-3">
              <Image 
                src={user.image || "/default-avatar.png"} 
                alt={user.username} 
                width={40} 
                height={40} 
                className="w-10 h-10 rounded-full" 
              />
              <div>
                <p className="font-bold">{user.username}</p>
                <p className="text-sm text-gray-500">{user.name}</p>
              </div>
            </Card>
          </Link>
          ))
        )}
      </div>
    </div>
  );
}
