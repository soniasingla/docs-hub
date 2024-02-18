contract;

storage {
    counter: u64 = 0,
}

abi Counter {
    #[storage(read, write)]
    fn increment();

    #[storage(read, write)]
    fn decrement();

    #[storage(read, write)]
    fn reset();

    #[storage(read)]
    fn count() -> u64;
}

impl Counter for Contract {
    #[storage(read)]
    fn count() -> u64 {
        storage.counter.read()
    }

    #[storage(read, write)]
    fn increment() {
        let incremented = storage.counter.read() + 1;
        storage.counter.write(incremented);
    }

    #[storage(read, write)]
    fn reset() {
        storage.counter.write(0);
    }

    #[storage(read, write)]
    fn decrement() {
        let decremented = storage.counter.read() - 1;
        storage.counter.write(decremented);
    }
}