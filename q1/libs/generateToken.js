export const generateToken = async () => {
    const response = await fetch(`${process.env.BASEURL}/auth`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "companyName": "sanjivani",
            "clientID": "fb4ac8db-6f4e-4a7f-8985-b312fb403e2e",
            "clientSecret": "MABlrStGRBwiwVmY",
            "ownerName": "Chetan Sapkal",
            "ownerEmail": "thechetanraje@gmail.com",
            "rollNo": "UIT21M1057"
        }),
    });
    const data = await response.json();
    return data;
}