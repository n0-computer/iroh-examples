use iroh_blobs::Hash;
use redb::TableDefinition;

/// Table mapping ipld hash to blake3 hash.
const HASH_TO_BLAKE3: TableDefinition<(u64, &[u8]), Hash> = TableDefinition::new("hash_to_blake3");
/// Table mapping ipld format and blake3 hash to contained links
const DATA_TO_LINKS: TableDefinition<(u64, Hash), Vec<u8>> = TableDefinition::new("data_to_links");

pub trait ReadableTables {
    fn hash_to_blake3(&self) -> &impl redb::ReadableTable<(u64, &'static [u8]), Hash>;
    fn data_to_links(&self) -> &impl redb::ReadableTable<(u64, Hash), Vec<u8>>;
}

impl<T: ReadableTables> ReadableTables for &T {
    fn hash_to_blake3(&self) -> &impl redb::ReadableTable<(u64, &'static [u8]), Hash> {
        (*self).hash_to_blake3()
    }

    fn data_to_links(&self) -> &impl redb::ReadableTable<(u64, Hash), Vec<u8>> {
        (*self).data_to_links()
    }
}

impl<T: ReadableTables> ReadableTables for &mut T {
    fn hash_to_blake3(&self) -> &impl redb::ReadableTable<(u64, &'static [u8]), Hash> {
        ReadableTables::hash_to_blake3(*self)
    }

    fn data_to_links(&self) -> &impl redb::ReadableTable<(u64, Hash), Vec<u8>> {
        ReadableTables::data_to_links(*self)
    }
}

pub struct Tables<'tx> {
    pub hash_to_blake3: redb::Table<'tx, (u64, &'static [u8]), Hash>,
    pub data_to_links: redb::Table<'tx, (u64, Hash), Vec<u8>>,
}

impl<'tx> Tables<'tx> {
    pub fn new(tx: &'tx redb::WriteTransaction) -> std::result::Result<Self, redb::TableError> {
        Ok(Self {
            hash_to_blake3: tx.open_table(HASH_TO_BLAKE3)?,
            data_to_links: tx.open_table(DATA_TO_LINKS)?,
        })
    }
}

impl ReadableTables for Tables<'_> {
    fn hash_to_blake3(&self) -> &impl redb::ReadableTable<(u64, &'static [u8]), Hash> {
        &self.hash_to_blake3
    }

    fn data_to_links(&self) -> &impl redb::ReadableTable<(u64, Hash), Vec<u8>> {
        &self.data_to_links
    }
}

pub struct ReadOnlyTables {
    pub hash_to_blake3: redb::ReadOnlyTable<(u64, &'static [u8]), Hash>,
    pub data_to_links: redb::ReadOnlyTable<(u64, Hash), Vec<u8>>,
}

impl ReadOnlyTables {
    pub fn new(tx: &redb::ReadTransaction) -> std::result::Result<Self, redb::TableError> {
        Ok(Self {
            hash_to_blake3: tx.open_table(HASH_TO_BLAKE3)?,
            data_to_links: tx.open_table(DATA_TO_LINKS)?,
        })
    }
}

impl ReadableTables for ReadOnlyTables {
    fn hash_to_blake3(&self) -> &impl redb::ReadableTable<(u64, &'static [u8]), Hash> {
        &self.hash_to_blake3
    }

    fn data_to_links(&self) -> &impl redb::ReadableTable<(u64, Hash), Vec<u8>> {
        &self.data_to_links
    }
}
