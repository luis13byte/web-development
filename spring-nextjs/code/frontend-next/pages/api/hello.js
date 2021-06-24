// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export async function getAllUsers() {

    const response = await fetch('/api/users');
    return await response.json();
}
