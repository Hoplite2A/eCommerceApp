
import { useState } from "react";

function getSavedVCart(key, initialValue)

export default function useLocalStorage(key, initialValue) {
    
    const [vCart, setVCart] = useState(initialValue);

    return [vCart, setVCart];
}