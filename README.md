# Steelmesh Engine

The `steelmesh-engine` package provides a service registry (via [seaport](https://github.com/substack/seaport)) and nginx proxy configuration (via [ngineer](https://github.com/DamonOehlman/ngineer)).  When these two libraries are combined, you are able to achieve a seamless node application deployment and restart container.

The engine is used in the core of [steelmesh](https://github.com/steelmesh/steelmesh) and also [steelmesh-leveldb](https://github.com/steelmesh/steelmesh-leveldb) which allows these two containers to focus on application deployment and update monitoring from their relevant storage containers ([CouchDB](http://couchdb.apache.org) and [LevelDB](https://code.google.com/p/leveldb/) respectively).