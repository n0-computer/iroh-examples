use std::{
    collections::BTreeMap,
    sync::{Arc, Mutex},
};

use derive_more::Debug;
use iroh_net::util::AbortingJoinHandle;
use tokio::task::JoinHandle;

/// A map of long lived or infinite tasks.
#[derive(Clone, Debug)]
pub struct TaskMap<T: Ord + Debug>(Arc<Inner<T>>);

impl<T: Ord + Debug> TaskMap<T> {
    /// Create a new task map.
    pub fn publish(&self, key: T, task: JoinHandle<()>) {
        let mut tasks = self.0.tasks.lock().unwrap();
        tasks.insert(key, task.into());
    }
}

impl<T: Ord + Debug> Default for TaskMap<T> {
    fn default() -> Self {
        Self(Default::default())
    }
}

#[derive(Debug)]
struct Inner<T: Ord> {
    tasks: Mutex<BTreeMap<T, AbortingJoinHandle<()>>>,
}

impl<T: Ord + Debug> Default for Inner<T> {
    fn default() -> Self {
        Self {
            tasks: Default::default(),
        }
    }
}
