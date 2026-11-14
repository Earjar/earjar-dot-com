import logging
import sys

class CustomLogger:
    _initialized = False

    def __init__(self, name="app"):
        self.logger = logging.getLogger(name)
        if not CustomLogger._initialized:
            handler = logging.StreamHandler(sys.stderr)
            formatter = logging.Formatter("(%(asctime)2s) %(levelname)s %(message)s")
            handler.setFormatter(formatter)
            self.logger.addHandler(handler)
            self.logger.setLevel(logging.INFO)
            self.logger.propagate = False
            CustomLogger._initialized = True

    def info(self, msg: str, p: str = ""):
        self.logger.info(f"{msg}")
        sys.stdout.flush()

    def error(self, msg: str, p: str = ""):
        self.logger.error(f"{msg}")
        sys.stdout.flush()
        
    def warning(self, msg: str, p: str = ""):
        self.logger.warning(f"{msg}")
        sys.stdout.flush()

    def critical(self, msg: str, p: str = ""):
        self.logger.critical(f"{msg}")
        sys.stdout.flush()

    def debug(self, msg: str, p: str = ""):
        self.logger.debug(f"{msg}")
        sys.stdout.flush()
        
    def exception(self, msg: str, p: str = ""):
        self.logger.exception(f"{msg}")
        sys.stdout.flush()
