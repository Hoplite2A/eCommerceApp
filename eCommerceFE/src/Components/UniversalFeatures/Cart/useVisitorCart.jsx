
import { useState } from "react";


export default function useVisitorCart(initialValue) {
    
    const [vCart, setVCart] = useState(initialValue);

    return [vCart, setVCart];
}