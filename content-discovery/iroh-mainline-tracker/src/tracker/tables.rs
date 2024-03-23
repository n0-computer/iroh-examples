//! Table definitions and accessors for the redb database.
use redb::{ReadableTable, TableDefinition, TableError};

use super::{AnnouncePath, AnnounceValue, ProbeValue};

pub(super) const ANNOUNCES_TABLE: TableDefinition<AnnouncePath, AnnounceValue> =
    TableDefinition::new("announces-0");
pub(super) const PROBES_TABLE: TableDefinition<AnnouncePath, ProbeValue> =
    TableDefinition::new("probes-0");

pub(super) trait ReadableTables {
    fn announces(&self) -> &impl ReadableTable<AnnouncePath, AnnounceValue>;
    fn probes(&self) -> &impl ReadableTable<AnnouncePath, ProbeValue>;
}

pub(super) struct Tables<'a, 'b> {
    pub announces: redb::Table<'a, 'b, AnnouncePath, AnnounceValue>,
    pub probes: redb::Table<'a, 'b, AnnouncePath, ProbeValue>,
}

impl<'db, 'txn> Tables<'db, 'txn> {
    pub fn new(tx: &'txn redb::WriteTransaction<'db>) -> std::result::Result<Self, TableError> {
        Ok(Self {
            announces: tx.open_table(ANNOUNCES_TABLE)?,
            probes: tx.open_table(PROBES_TABLE)?,
        })
    }
}

impl ReadableTables for Tables<'_, '_> {
    fn announces(&self) -> &impl ReadableTable<AnnouncePath, AnnounceValue> {
        &self.announces
    }
    fn probes(&self) -> &impl ReadableTable<AnnouncePath, ProbeValue> {
        &self.probes
    }
}

/// A struct similar to [`redb::ReadOnlyTable`] but for all tables that make up
/// the blob store.
pub(super) struct ReadOnlyTables<'txn> {
    pub announces: redb::ReadOnlyTable<'txn, AnnouncePath, AnnounceValue>,
    pub probes: redb::ReadOnlyTable<'txn, AnnouncePath, ProbeValue>,
}

impl<'txn> ReadOnlyTables<'txn> {
    pub fn new(tx: &'txn redb::ReadTransaction<'txn>) -> std::result::Result<Self, TableError> {
        Ok(Self {
            announces: tx.open_table(ANNOUNCES_TABLE)?,
            probes: tx.open_table(PROBES_TABLE)?,
        })
    }
}

impl ReadableTables for ReadOnlyTables<'_> {
    fn announces(&self) -> &impl ReadableTable<AnnouncePath, AnnounceValue> {
        &self.announces
    }
    fn probes(&self) -> &impl ReadableTable<AnnouncePath, ProbeValue> {
        &self.probes
    }
}
